
// Helper function to inject contents into the pages from different files.
export default function inject(files, title) {
  var elementToInject = files.filter(file => file.node.frontmatter.title === title)[0];

  return elementToInject != null?  elementToInject.node.html : 'MISSING CONTENT!!!';
}
