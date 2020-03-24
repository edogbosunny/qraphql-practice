function links(parent, args, {prisma}) {
    return prisma.user({ id: parent.id }).links()
  }
  
  module.exports = {
    links,
  }