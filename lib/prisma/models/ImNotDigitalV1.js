import prisma from '.'

export async function getNfts() {
  try {
    const nfts = await prisma.ImNotDigitalV1.findMany()
    return { nfts }
  } catch (error) {
    return { error }
  }
}

export async function createNft(ImNotDigitalV1) {
  try {
    const NftFromDB = await prisma.ImNotDigitalV1.create({ data: ImNotDigitalV1 })
    return { ImNotDigitalV1: NftFromDB }
  } catch (error) {
    return { error }
  }
}

export async function getNftById(tagUid) {
  try {
    const nft = await prisma.ImNotDigitalV1.findUnique({where: { tagUid }})
    return { nft }
  } catch (error) {
    return { error }
  }
}

export async function deleteNftById(tagUid) {
  try {
    const nft = await prisma.ImNotDigitalV1.delete({where: { tagUid }})
    return { nft }
  } catch (error) {
    return { error }
  }
}

export async function updateNftById(tagUid, data) {
  const update = data.update;
  try {
    const nft = await prisma.ImNotDigitalV1.update({
      where: { tagUid },
      data: update
    })
    return { nft }
  } catch (error) {
    return { error }
  }
}

