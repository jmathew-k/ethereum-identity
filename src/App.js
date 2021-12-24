


import './App.css'
import { useState } from 'react'

import CeramicClient from '@ceramicnetwork/http-client'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'

import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import { DID } from 'dids'
import { IDX } from '@ceramicstudio/idx'

const endpoint = "https://cermaic-clay.3boxlabs.com"

function App() {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [loaded, setLoaded] = useState(false)

  async function connect() {
    const addresses = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
      return addresses
  }

async function readProfile() {
  const [address] = await connect()
  const ceramic = new CeramicClient(endpoint)
  const idx = new IDX({ ceramic })


  try {
    const data = await idx.get(
      'basicProfile',
      `${address}@eip115:1`
    )
    console.log('data: ', data)
    if (data.name) setName(data.name)
    if (data.avatar) setImage(data.avatar)
  } catch (error) {
    console.log('error: ', error)
    setLoaded(true)
  }
}


  return (
    <div className="App">
      
    </div>
  );
}

export default App;
