"use client"
import { useData, usePrice } from '../hooks/useData'
import { CoinsData } from '@/types/api'
import { Table } from '@/components/Table'
import Loader from '@/components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { selectCoin, setDropdownVisibility } from '../slices/coinSlice'
import Image from 'next/image'

export default function Home() {
  const { selectedCoin, selectedCoinCode, selectedCoinLogo, dropdownVisible } = useSelector((state: any) => state.coin)
  const dispatch = useDispatch()

  const { data, error } = useData()
  const { coinsData, coinLoading } = usePrice(selectedCoinCode)

  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No data</div>

  function chooseCoin(coin: CoinsData) {
    dispatch(selectCoin({ name: coin.name, code: coin.code, logo: coin.symbol }))
    dispatch(setDropdownVisibility(false))
  }

  const columns = [
    { header: 'Currency', accessor: 'currency' as const, width: '25%' },
    { header: 'Rate', accessor: 'rate' as const, width: '25%' },
    { header: 'Updated At', accessor: 'updatedAt' as const, width: '50%' },
  ];

  return (
    <main className="flex min-h-screen w-full flex-col p-4 md:p-24">
      {/* Coin logo */}
      {selectedCoinLogo && <Image src={selectedCoinLogo} alt={selectedCoinCode} width={"25"} height={"25"} />}

      {/* Title */}
      <h1 className='mt-4 text-5xl font-black'>FomoFactory</h1>
      <p className='mt-1 text-xs'>Project created as assignment, by
        {' '}<a className='text-blue-600 underline underline-offset-2 cursor-pointer' target='_blank' href="https://github.com/kaustubhai">Kaustubhai</a>
      </p>

      {/* Select coin button */}
      <button
        onClick={() => dispatch(setDropdownVisibility(!dropdownVisible))}
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`${!dropdownVisible && !selectedCoinCode && "motion-safe:animate-bounce"} relative z-10 mt-4 mb-1 w-44 text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        type="button"
      >
        {selectedCoin || "Choose a coin"}
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {/* Dropdpwn menu */}
      <div id="dropdown" className={`${!dropdownVisible && "hidden"} absolute z-20 top-36 md:top-56 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          {data.map((coin, index) => (
            <li key={index} onClick={() => chooseCoin(coin)}>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{coin.name}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Table to display coin data */}
      {(coinLoading && selectedCoinCode) ?
        <Loader size='large' color='border-blue-500' className="m-4" />
        :
        <Table columns={columns} data={coinsData} className="my-4" />}
    </main>
  )
}