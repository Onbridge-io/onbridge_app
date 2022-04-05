import { useState, useRef } from 'react'

function removeTextSelection() {
  if (window.getSelection) {
    // Chrome
    if (window.getSelection().empty) {
      window.getSelection().empty()
      // Firefox
    } else if (window.getSelection().removeAllRanges) {
      window.getSelection().removeAllRanges()
    }
    // IE?
  } else if (document.selection) {
    document.selection.empty()
  }
}

export function useCopyToClipboard() {
  const ref = useRef(null)
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    if (!copySuccess) {
      ref.current.select()
      document.execCommand('copy')
      removeTextSelection()
      setCopySuccess(true)

      setTimeout(() => {
        setCopySuccess(false)
      }, 1500)
    }
  }

  return [copySuccess, copyToClipboard, ref]
}
