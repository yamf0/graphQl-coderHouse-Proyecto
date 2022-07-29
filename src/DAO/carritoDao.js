import { carritoDto, carritoMap } from "../DTO/carritoDto.js";
import crypto from 'crypto'


class carritoDao{

    static async getCarritos(){
        return carritoMap
    }

    static async getCarrito({id}){
        const carrito = await carritoMap.filter((car) => car.id === id)
        if(carrito){
            return carrito
        }
        return 1
    }


    static async createCarrito(){
        const id =  crypto.randomBytes(10).toString('hex');
        const timestamp = Date.now()
        try{
            var newCarrito = new carritoDto({
                id, 
                timestamp,
                productos: []
            })
        }catch(e){
            console.log(e)
            return 1
        }

        carritoMap.push(newCarrito)

        return newCarrito
    }

}


export default carritoDao