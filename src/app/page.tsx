"use client"
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { toast } from 'sonner'


const page =() => {
  const trpc=useTRPC()
  const invoke=useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Job invoked successfully")
    }
  }))
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      
      <Button onClick={()=>invoke.mutate({text:"turbo"})}>
        Invoke background Job
      </Button>
    </div>
  )
}

export default page