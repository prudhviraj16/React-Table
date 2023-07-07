import React, {useEffect, useRef} from 'react'

const Checkbox = React.forwardRef(({indeterminate, ...rest},ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])


  return (
    <>
        <input type="checkbox" ref={resolvedRef} {...rest}/> 
    </>
  )
})

export default Checkbox
