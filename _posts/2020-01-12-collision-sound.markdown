---
layout: post
title:  "Playing Sounds on Collision in Unity"
date:   2020-01-24 17:00:00
last_modified_at:  2020-01-24 17:30:00
excerpt: "Let's talk about an easy yet powerful way of adding sound to collisions in Unity"
categories: tutorial, programming
tags: unity, collision, sound, fmod, studio
image:
  feature: collision-sound.jpg
  topPosition: -320px
  topPositionFeatured: 48%
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: no
---

**Unity** sound engine offers a decent performance for most little projects, but when
looking for more advanced audio features, it usually falls short. With this
project we aim to mix the power of **FMOD Studio** with the **Unity** physics engine.

Keep reading if you want to learn more!

#### Unity audio engine is good, isn't it?
For the past month, I've been working with
[a colleague of mine](https://github.com/dimart10){:target="_blank"}
on this idea about making a solid **collision sound engine**. At first it may seem
like there's not much to do, since Unity already provides its own audio capabilities,
and syncing it with the physics engine is an easy task.

The problem is, Unity's audio engine is not really prepared to handle more
advanced projects. As a game's complexity grows, so does its audio's.
In order to keep a clean, understandable and easy to modify audio project,
middleware such are FMOD can come in handy.

#### The power of FMOD

In *FMOD Studio*, the base unit is the event,
if you want to play a sound, you must create an event and assign the
audio file to it. Since the key element are the events, specific files
lose importance. This means you could change the entire audio of a game
while keeping the same structure.

For example, if you are making a shooter, at some point you'd probably like
your gun to play a shoot sound. If using Unity, you'd need to add an *Audio Source*
component to your gun, and then make it play from your code when shooting.
That's an okay reasoning, it's easy to understand and pretty straightforward.

But if you try to make it more complex, you start to notice some weaknesses. Like
if you tried to make slightly different sounds for each bullet, not to make it
look so repetitive. You would need, of course, to code it. But how the sound
sounds is a problem that should be taken care by the sound designer, so why in
hell would you need to code something like that?

<div class="img img--fullContainer img--9xLeading" style="background-image: url({{site.baseurl}}{{site.baseurl_posts_img}}collision-sound/fmod-logo.png); background-size: contain"></div>

If instead you were using FMOD Studio, the programming gets out of the equation,
the sound designer can just randomize a parameter every time an event gets played,
and apply different effects depending on that. As easy as that.

#### So what about the project?

If you want to play sounds anytime a collision is detected between two objects,
you can use the Unity engine, but if you've read the previous paragraphs, you'll
notice why this is not such a great idea.

If your game audio starts growing in
complexity, it will get completely out of control, and changing the smallest
sound will become a nightmare. This gets specially troublesome when working in a
team, because your sound designer would need to mess with the Unity project to
do his/her work.

So, you tight up your shoes and get into the FMOD business, how hard can it be?
While the FMOD Unity integration can be easily handled, synchronizing and tuning
it up correctly with the physics engine can require much more work than one may
initially think.

You can use the trigger function that comes with the *FMOD Studio
Event Emitter*, but that won't get you very far, since you'd still need to code
the selection of the event depending on which body the GameObject collides with.

That's where this project comes into picture, the idea is to provide an extended
Unity FMOD integration for those who wanna handle sounds on collision.

#### How does it work
Let's take a look at how to setup a simple **Collision Sound** project, I will not
delve into much detail in this post, if you want an in depth guide
you can find it [here](https://github.com/Sag-Dev/collision-sound#how-to-use){:target="_blank"}.

We've tried to keep the project as clear and straightforward as possible, but
if you've never worked with FMOD before, you should go
[learn the basics](https://www.fmod.com/learn){:target="_blank"} before trying
to use **Collision Sound**.

The project works [in general terms] as following: from the FMOD side, there's a
project with all the events that will play on different collisions, it will handle
everything related to the sound itself; Unity will take care of the logic,
you only have to configure the **SoundCollider** script on the *GameObjects* you want
to behave as such.

I recommend you to [download this demo](https://github.com/Sag-Dev/collision-sound/releases){:target="_blank"},
it will be much easier to understand than just reading about it.

##### FMOD Setup
In the FMOD Project, there's a parent folder named **SoundMaterials** at the
root of the project, and each of its events must be assigned to a bank with that
same name.

Every subfolder under **SoundMaterials** represents each different material, and
it must have at least one event with the same name as the folder. This is the
default event, it will be played when colliding if no other more specific event
can be found.

Specific collision interactions can be created by adding one event with the name
of one of the materials under the folder of the other material. e.g. "wood/metal":
metal event under the *wood* folder, it will be played every time wood collides
with metal (or vice versa).

##### Unity Setup
Unity setup is very simple, just import the package, add a *FMOD Studio Listener*
to your camera and start adding **SoundCollider** events to anything you want to
play sounds on collision. Just remember that it must have a valid material name
and as well as a *Collider[2d]* and a *RigidBody[2d]* (**unless the collider is a
trigger**).

##### Features
Those are some of the key features of **Collision Sound**:
- **Generic & specific** sound material interactions (different events depending on what collides with what).
- **Built in parameters** that auto sync in runtime: velocity, mass and size.
- **Custom parameters**, you set your custom FMOD parameters from code for any *SoundCollider*.

#### Showcase
We've put up a very simple demo in Unity to show how this project works and how
it should be used. Check out the video to see it working, or
[download the Unity project](https://github.com/Sag-Dev/collision-sound/releases){:target="blank"}
if you want to test it yourself.

<br>
<div class="iframe-wrapper">
<iframe class="iframe-video" src="https://www.youtube.com/embed/9sOHbRK5zb4" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

#### Thank you!
Thank you for reading to the very end, I hope you liked the project. If you didn't,
please let us know why and how would you improve it, it would be of great help!

If you want, you can
[contribute to the project on Github](https://github.com/Sag-Dev/collision-sound#contributing){:target="_blank"}
; not only with code, but also posting any issue you find or requesting features
you reckon would be cool to have.
