import { memo, useContext, useEffect, useState } from 'react'
import { StoreContext } from './context'

export function connect (mapStateToProps: Function, mapDispatchToProps: Function) {
  return (WrappedComponent: any) => memo((props: any) => {
      const store = useContext(StoreContext)

      const [storeState, setStoreState] = useState(mapStateToProps(store.getState()))

      useEffect(() => {
        const unsubscribe = store.subscribe(() => setStoreState(store.getState()))
        return () => unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      return <WrappedComponent {...props} {...storeState} {...mapDispatchToProps(store.dispatch)}/>
    },
  )
}
