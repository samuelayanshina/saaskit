// lib/hooks/useDebouncedValue.ts
import {useEffect, useState} from "react"

const useDebouncedValue = (value: any, delay = 1000) => {
  const [debounced, setDebounced] = useState(value)

  useEffect(()=>{
    const t = setTimeout(()=>setDebounced(value), delay)
    return ()=>clearTimeout(t)
  },[value, delay])

  return debounced
}

export default useDebouncedValue
