import { useState } from "react"
const EventModal = () => {
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    return (
        <div className="fixed right-[40%] top-[40%] w-[400px] rounded-lg bg-white drop-shadow-2xl overflow-hidden">
            <div className="h-[36px] bg-gray-200 rounded-t flex items-center justify-between px-6">
                <img className="w-4" src="https://static.thenounproject.com/png/1614616-200.png"></img>
                <img className="w-3" src="https://cdn-icons-png.flaticon.com/512/3917/3917759.png"></img>
            </div>
            <div className="border-b border-gray-300">
                <div className="ml-[16px] pl-[52px] pt-[16px] ">
                    <input className="w-[300px] text-[16px] focus:outline-none focus:border-b-2 focus:border-blue-500 border-b border-gray-300" value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Add title"></input>
                </div>
                <div className="flex flex-rol my-3 h-[50px]">
                    <div className="w-[68px] flex justify-center items-center">
                        <img className="w-5" src="https://cdn-icons-png.flaticon.com/512/109/109613.png"/>
                    </div>
                    <div className="flex items-center font-semibold text-[14px]">Monday, September 13</div>
                </div>
                <div className="flex flex-rol mt-3 mb-10 h-[40px]">
                    <div className="w-[68px] flex justify-center items-center">
                        <img className="w-5" src="https://cdn.onlinewebfonts.com/svg/img_273709.png"></img>
                    </div>
                    <input className="w-[300px] text-[14px] focus:outline-none focus:border-b-2 focus:border-blue-500 border-b border-gray-300" value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Add title"></input>
                </div>
            </div>
            <div className="flex h-[60px] justify-end items-center">
                <div className="flex mr-3 items-center justify-center text-[14px] font-semibold w-[80px] h-[35px] rounded-md bg-blue-500 text-white">
                    Save
                </div>
            </div>
        </div>
    )
}
export default EventModal