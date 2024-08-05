"use client"
import { array } from '@/data'
import { Button, Divider, Input, ScrollShadow } from '@nextui-org/react'
import { Cookie } from 'next/font/google'
import React, { ChangeEvent, useState } from 'react'

const cookie = Cookie({
    weight:'400',
    subsets:['latin']
})

interface Form{
  transaction: string,
  date: string,
  description: string
}

const TrackingForm = () => {
  const [transaction, setTransaction] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [form, setForm] = useState<Form[]>([])
  const handleClick = () => {
    const newUser : Form = {transaction:transaction,date:date,description:description}
    setForm([...form,newUser])
    setTransaction("")
    setDate("")
    setDescription("")
    console.log(form)
  }

  const handleTextChange = (e:ChangeEvent<HTMLInputElement>) => {
    setTransaction(e.target.value)
  }

  const handleDateChange = (e:ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

  const handleDescChange = (e:ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }
  let value = 0
  form.map((item) => (
    item.transaction[0] === '-' ? value = value - parseFloat(item.transaction.slice(1,item.transaction.indexOf(' ')))
    : value = value + parseFloat(item.transaction.slice(1,item.transaction.indexOf(' ')))
  ))
  return (
    <section className={`bg-black  p-3 flex flex-col gap-10 shadow-md rounded-2xl shadow-slate-100/25 w-[500px] h-[500px] my-2 mx-auto`}>
        <h3 className={`${cookie.className} text-4xl `}>${value}</h3>
        <div className='grid grid-cols-2 gap-5'>
            <Input color='default' type='text'label="New Transaction" placeholder='+200 samsung tv' value={transaction} onChange={handleTextChange}/>
            <Input color='default' type='date'label="Date" value={date} onChange={handleDateChange}/>
        </div>
        <Input color='default' type='text'label="description" value={description} onChange={handleDescChange}/>
        <Button className='bg-green-500' onClick={handleClick}>
            Add new Transaction
        </Button>
        {/* tracking details*/}
        <ScrollShadow className='h-[150px]'>
        {form.map((item) => (
          <div>
            <div className='flex flex-row justify-between'>
              <h1>{item.transaction.slice(item.transaction.indexOf(' '),item.transaction.length)}</h1>
              {item.transaction[0] === '-'? <h1 className='text-red-700' >-${item.transaction.slice(1,item.transaction.indexOf(' '))}</h1> : 
              <h1 className='text-green-700 '>+${item.transaction.slice(1,item.transaction.indexOf(' '))}</h1>}
            </div>
            <h1 className=''>{item.description}</h1>
            <Divider className='border-2'/>
          </div>
        ))}
        </ScrollShadow>
        
    </section>
  )
}

export default TrackingForm