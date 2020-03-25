function postedBy (parent, args, {prisma}) {
    return prisma.link({ id: parent.id }).postedBy()
}
  
function votes(parent, args, context) {
  return context.prisma.link({ id: parent.id }).votes()
}
  
  module.exports = {
    postedBy,
    votes
  }