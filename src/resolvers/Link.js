function postedBy (parent, args, {prisma}) {
    return prisma.link({ id: parent.id }).postedBy()
  }
  
  module.exports = {
    postedBy,
  }