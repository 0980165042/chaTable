import { useTable } from 'react-table'
import { useMemo } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setData, setNull, setDelete, setNoCount, setEdit } from './slice'
import { useEffect } from 'react'

function App() {
  const dataSimu = useSelector((state) => state.data)
  const dispatch = useDispatch()

  const addData = () => {
    dispatch(setNoCount())
    dispatch(setData({
      name: name,
      mat: mat,
      how: how,
      milk: milk,
      sweet: sweet,
    }))
    setName("")
    setMat("")
    setHow("")
    setSweet("")
  }

  const [name, setName] = useState("")
  const [mat, setMat] = useState("")
  const [how, setHow] = useState("")
  const [milk, setMilk] = useState("")
  const [sweet, setSweet] = useState("")
  const [displayModal, setDisplayModal] = useState('none')
  const [editIndex, setEditIndex] = useState("")
  

  const columns = useMemo(
    () => [
      {
        Header: 'ลำดับ',
        accessor: 'no', // accessor is the "key" in the data
      },
      {
        Header: 'ชื่อสูตร',
        accessor: 'name',
      },
      {
        Header: 'วัตถุดิบ',
        accessor: 'mat',
      },
      {
        Header: 'ขั้นตอนการทำ',
        accessor: 'how',
      },
      {
        Header: 'นม',
        accessor: 'milk',
        Cell: ({ cell: { value } }) => (
          value === "yes"
            ? <div className={`flex justify-center items-center`}><img className='w-5' src='https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/tick-green-icon.png'></img></div>
            : <div className={`flex justify-center items-center`}><img className='w-5' src='https://icon-library.com/images/wrong-icon/wrong-icon-17.jpg'></img></div>
        )
      },
      {
        Header: 'ความหวาน',
        accessor: 'sweet',
      }
    ],
    []
  )

  const data = dataSimu.data

  useEffect(() => {
    console.log(milk);
    console.log(name + "เรียบร้อยย");
  }, [dataSimu.data, milk])

  const handleChange = (e) => {
    setMilk(e.target.value);
  }

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: 'ดำเนินการ',
        Cell: ({ row }) => (
          <div className=''>
            <button onClick={() => {
              setEditIndex(parseInt(row.values.no));
              console.log(parseInt(row.values.no));
            }} className=' bg-blue-500 mr-3 w-[70px] h-[30px] rounded-lg font-semibold text-white hover:bg-blue-600'>
              แก้ไข
            </button>
            <button className=' bg-red-500 w-[70px] h-[30px] rounded-lg font-semibold text-white hover:bg-red-600' onClick={() => dispatch(setDelete({ no: row.values.no }))}>
              ลบ
            </button>
          </div>
        )
      }
    ])
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, tableHooks)

  return (
    <div style={{ backgroundImage: `url(/img/bg1.jpg)` }} className='bg-cover w-screen h-screen flex flex-col justify-center items-center'>
      {/* Add list Modal */}
      <div style={{ display: displayModal, backgroundImage: `url(https://i.pinimg.com/564x/cf/ac/f3/cfacf3bdf44cc98cef0ecfeb66c41451.jpg)` }} className='text-black font-serif bg-cover font-semibold w-[600px] bg-slate-400 rounded-xl overflow-hidden absolute z-10 space-y-3'>
        <div className=' mb-6 flex flex-rol justify-center bg-slate-700 h-10 items-center'>
          <div className='text-white font-semibold'>เพิ่มรายการ</div>
          <button>
            <img className=' absolute right-4 top-4 w-3' 
            onClick={() => { setDisplayModal('none') }}
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8BM8K0P6UhJnZ2UyM51c2aqLcsUMKsa6XvoGCaB6xXRQ7e6ee_ckHC4J7cTZo2f7M4OA&usqp=CAU'></img>
          </button>
        </div>
        <div>
          <p className='ml-[60px]'>ชื่อสูตร:</p>
          <div className='flex justify-center'>
            <input className=" p-1 focus:outline-none font-medium text-sm h-[32px] w-[80%]  flex items-center" value={name} onChange={(e) => { setName(e.target.value) }} />
          </div>
        </div>
        <div>
          <p className='ml-[60px]'>วัตถุดิบ:</p>
          <div className='flex justify-center'><input className=" focus:outline-none p-1 font-medium text-sm h-[32px] w-[80%]  flex items-center" value={mat} onChange={(e) => { setMat(e.target.value) }} /></div>
        </div>
        <div>
          <p className='ml-[60px]'>ขั้นตอนการทำ:</p>
          <div height="48" className='flex justify-center'><textarea rows={6} className=" p-1 focus:outline-none font-medium text-sm w-[80%]  flex items-center" value={how} onChange={(e) => { setHow(e.target.value) }} /></div>
        </div>
        <div className='ml-[60px]'>
          <span className='mr-3'>นม:</span>
          <input onChange={handleChange} value="yes" type="radio" id="milk" name={milk} />
          <label className='mr-3' for="milk">ใส่นม</label>
          <input onChange={handleChange} value="no" type="radio" id="nomilk" name={milk} />
          <label for="nomilk">ไม่ใส่นม</label>
        </div>
        <div className='mb-[30px]'>
          <p className='ml-[60px]'>ความหวาน:</p>
          <div className='flex justify-center'><input className=" focus:outline-none p-1 font-medium text-sm h-[32px] w-[80%]  flex items-center" value={sweet} onChange={(e) => { setSweet(e.target.value) }} /></div>
        </div>
        <div className='flex justify-center'>
          <button onClick={() => {
            setDisplayModal('none');
            addData();
            console.log(typeof (milk));
          }} className='flex justify-center mb-5 bg-green-500 hover:bg-green-600 w-[100px] h-8 items-center rounded-lg font-semibold text-white'>บันทึก</button>
        </div>
      </div>
      {/* table */}
      <div className={`${dataSimu && dataSimu.data && dataSimu.data.length > 0 ? "block" : "hidden"} max-h-[600px] overflow-y-scroll`}>
        <table {...getTableProps()} className={`border-2 border-orange-500 w-[1500px] rounded-xl overflow-hidden`}>
          <thead className=''>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    className=' bg-gray-400 h-10'
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className=''>
            {rows?.map((row, index) => {
              prepareRow(row)
              return (
                <>
                  {/* Edit list Modal */}
                  < div style={{ backgroundImage: `url(https://www.ryoiireview.com/upload/article/202205/1653554788_3fa462853cca91e7d85dd8364e500897.jpg)` }} className={`${editIndex === (index + 1) ? 'block' : 'hidden'} bg-cover w-[600px] top-[20%] right-[30%] space-y-3 bg-slate-400 font-semibold rounded-xl overflow-hidden absolute z-10`} >
                    <div className='flex flex-rol justify-center bg-orange-100 h-10 items-center'>
                      <div className='font-semibold'>แก้ไขรายการ</div>
                      <div onClick={() => { setEditIndex(null); console.log(index); }}>
                        <button>
                          <img className=' absolute right-4 top-4 w-3' src='https://static.thenounproject.com/png/1890803-200.png'></img>
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className='text-white ml-[60px]'>ชื่อสูตร:</p>
                      <div className='flex justify-center'><input className="p-1 focus:outline-none font-medium text-sm h-[32px] w-[80%]  flex items-center" value={name} onChange={(e) => { setName(e.target.value) }} /></div>
                    </div>
                    <div>
                      <p className='text-white ml-[60px]'>วัตถุดิบ:</p>
                      <div className='flex justify-center'><input className="p-1 focus:outline-none font-medium text-sm h-[32px] w-[80%]  flex items-center" value={mat} onChange={(e) => { setMat(e.target.value) }} /></div>
                    </div>
                    <div>
                      <p className='text-white ml-[60px]'>ขั้นตอนการทำ:</p>
                      <div className='flex justify-center'><textarea rows={6} className="p-1 focus:outline-none font-medium text-sm w-[80%]  flex items-center" value={how} onChange={(e) => { setHow(e.target.value) }} /></div>
                    </div>
                    <div className='text-white ml-[60px]'>
                      <span className='mr-3'>นม:</span>
                      <input onChange={() => setMilk(true)} checked={milk} type="radio" id="milk" name="milk" />
                      <label className='mr-3' for="milk">ใส่นม</label>
                      <input onChange={() => setMilk(false)} checked={!milk} type="radio" id="nomilk" name="milk" />
                      <label for="nomilk">ไม่ใส่นม</label>
                    </div>
                    <div className='mb-[30px]'>
                      <p className='text-white ml-[60px]'>ความหวาน:</p>
                      <div className='flex justify-center'><input className="p-1 focus:outline-none font-medium text-sm h-[32px] w-[80%]  flex items-center" value={sweet} onChange={(e) => { setSweet(e.target.value) }} /></div>
                    </div>
                    <div className='flex justify-center'>
                      <button onClick={() => {
                        dispatch(setEdit({
                          no: (index + 1),
                          name: name,
                          mat: mat,
                          how: how,
                          milk: milk,
                          sweet: sweet,
                        }));
                        setName("")
                        setMat("")
                        setHow("")
                        setMilk(true)
                        console.log(milk);
                        setSweet("")
                        console.log(index + 1);
                        setEditIndex(null);
                      }} className='flex justify-center mb-5 bg-green-500 hover:bg-green-600 w-[100px] h-8 items-center rounded-lg font-semibold text-white'>บันทึก</button>
                    </div>
                  </div >
                  {/* Data in table */}
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className=' bg-slate-100 text-center p-8 border border-gray-300 max-w-[300px]'
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </div>
      <button className='mt-6 text-white drop-shadow-xl bg-green-500 hover:bg-green-600 h-[35px] w-[120px] rounded-xl font-semibold' onClick={() => {
        setDisplayModal('block');
      }}>เพิ่มรายการ</button>
      <button onClick={() => { dispatch(setNull()) }} className='bg-red-500 hover:bg-red-600 mt-6 text-white drop-shadow-xl h-[35px] w-[120px] rounded-xl font-semibold'>ล้างงง</button>
    </div >
  )
}

export default App;
