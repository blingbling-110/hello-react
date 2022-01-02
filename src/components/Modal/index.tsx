import { createPortal } from "react-dom";
import './index.scss'

export const Modal = (props: any) => {
  let modal = document.getElementById('modal')
  !modal && (modal = document.createElement('div'))
  modal.id = 'modal'
  document.body.append(modal)
  return createPortal(props.children, modal)
}
