import prisma from '.'

export async function getNfts() {
  try {
    const nfts = await prisma.Collectible.findMany()
    return { nfts }
  } catch (error) {
    return { error }
  }
}

export async function createNft(Collectible) {
  try {
    const NftFromDB = await prisma.Collectible.create({ data: Collectible })
    return { Collectible: NftFromDB }
  } catch (error) {
    return { error }
  }
}

export async function getNftById(tagUid) {
  try {
    const nft = await prisma.Collectible.findUnique({where: { tagUid }})
    return { nft }
  } catch (error) {
    return { error }
  }
}

export async function deleteNftById(tagUid) {
  try {
    const nft = await prisma.Collectible.delete({where: { tagUid }})
    return { nft }
  } catch (error) {
    return { error }
  }
}

export async function updateNftById(tagUid, data) {
  const update = data.update;
  try {
    const nft = await prisma.Collectible.update({
      where: { tagUid },
      data: update
    })
    return { nft }
  } catch (error) {
    return { error }
  }
}

