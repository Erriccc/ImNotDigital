import prisma from '.'

export async function getNfts() {
  try {
    const nfts = await prisma.Nft.findMany()
    return { nfts }
  } catch (error) {
    return { error }
  }
}

export async function createNft(Nft) {
  try {
    const NftFromDB = await prisma.Nft.create({ data: Nft })
    return { Nft: NftFromDB }
  } catch (error) {
    return { error }
  }
}

export async function getNftById(tagUid) {
  try {
    const nft = await prisma.Nft.findUnique({where: { tagUid }})
    return { nft }
  } catch (error) {
    return { error }
  }
}

export async function deleteNftById(tagUid) {
  try {
    const nft = await prisma.Nft.delete({where: { tagUid }})
    return { nft }
  } catch (error) {
    return { error }
  }
}

export async function updateNftById(tagUid, data) {
  const update = data.update;
  try {
    const nft = await prisma.Nft.update({
      where: { tagUid },
      data: update
    })
    return { nft }
  } catch (error) {
    return { error }
  }
}

