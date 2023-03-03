import Link from 'next/link'
import { getNfts } from '@/nftModel'

const Nfts = (props) => {
  // const { users } = await getUsers()

  return (
    <section >
      <div >
        <h2 >
            Digital Collectibles
        </h2>
        <ul >
          {props.nfts?.map(nft => (
            <li key={nft.id} >
              <Link href={`claim/${nft.tagUid}`}>{nft.issuer}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export const getServerSideProps = async () => {

    async function getData() {
        const { nfts } = await getNfts()
        if (!nfts) {
          throw new Error('Failed to fetch data')
        }
      
        return nfts
      }

    const nfts = await getData()
    return {
      props: { nfts },
    }
  }
  export default Nfts