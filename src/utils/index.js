import axios from "axios"
import { Toast } from "antd-mobile"

 export const   getCurrentCity=() => {
        const localCity = JSON.parse(localStorage.getItem('hkzf_city'))
        if (!localCity) {
            // 如果没有则需要进行定位
            const geolocation = new window.BMapGL.Geolocation()
            geolocation.enableSDKLocation()
            return new Promise((resolve, reject) => {
                geolocation.getCurrentPosition(async function (r) {
                    if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
                        try {
                            const result = await axios.get('http://localhost:8080/area/info', {
                                params: {
                                    name: r.address.city,
                                }
                            })
                            localStorage.setItem('hkzf_city', JSON.stringify(result.data.body))
                            resolve(result.data.body)
                        } catch (e) {
                            reject(e)
                        }

                    }
                    else {
                        Toast.show({
                            content: 'failed' + this.getStatus(),
                            duration: 1000,
                        })
                        reject('failed' + this.getStatus())
                    }
                })
            })
        } else {
            // 如果有则可以直接返回本地存储中的城市数据
            // 注意:因为上面为了处理异步操作,使用了Promise,因此,为了该函数返回值的统一,此处,也应该使用Promise
            // 因为此处的Promise 不会失败,所以,此处,只要返回一个成功的Promise即可
            return Promise.resolve(localCity)

        }

    }
