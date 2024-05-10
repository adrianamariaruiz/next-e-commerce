'use server'

import { prisma } from "@/lib/prisma"

export const getUserAddress = async(userId: string) => {

  try {
    
    const addressFromDB = await prisma.userAddress.findUnique({
      where: {userId}
    })

    if(!addressFromDB){
      return null
    }

    const {countryId, address2, ...rest} = addressFromDB

    return {
      ...rest,
      country: countryId,
      address2: address2 ? address2 : ''
    };

  } catch (error) {
    console.log(error)
    return null
  }
}