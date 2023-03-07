import prisma from '.'

export async function getNfts() {
  try {
    const nfts = await prisma.ImNotDigital.findMany()
    return { nfts }
  } catch (error) {
    return { error }
  }
}

export async function createNft(ImNotDigital) {
  try {
    const NftFromDB = await prisma.ImNotDigital.create({ data: ImNotDigital })
    return { ImNotDigital: NftFromDB }
  } catch (error) {
    return { error }
  }
}

export async function getNftById(tagUid) {
  try {
    const nft = await prisma.ImNotDigital.findUnique({where: { tagUid }})
    return { nft }
  } catch (error) {
    return { error }
  }
}

export async function deleteNftById(tagUid) {
  try {
    const nft = await prisma.ImNotDigital.delete({where: { tagUid }})
    return { nft }
  } catch (error) {
    return { error }
  }
}

export async function updateNftById(tagUid, data) {
  const update = data.update;
  try {
    const nft = await prisma.ImNotDigital.update({
      where: { tagUid },
      data: update
    })
    return { nft }
  } catch (error) {
    return { error }
  }
}

