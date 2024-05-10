'use server'

import type { Address } from "@/interfaces/address.interface";
import { prisma } from "@/lib/prisma";

export const setUserAddress = async(address: Address, userId: string) => {
  try {

    const newAddress = await createOrReplaceAddress(address, userId)
    return {
      ok: true,
      address: newAddress
    }
    
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'could not save address'
    };
    
  }

}

const createOrReplaceAddress = async(address: Address, userId: string) => {
  try {
     const userAddres = await prisma.userAddress.findUnique({
      where: {userId}
     })

     const addressStorage = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      city: address.city,
      postalCode: address.postalCode,
     }

     if(!userAddres){
      const newAddress = await prisma.userAddress.create({
        data: addressStorage
      })

      return newAddress;
     }

     const updateAddress = await prisma.userAddress.update({
      where: {userId},
      data: addressStorage
     })

     return updateAddress;


  } catch (error) {
    console.log(error)
    throw new Error('could not save address')
  }

}