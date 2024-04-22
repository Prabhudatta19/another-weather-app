import React from 'react'

function PageHeader(props) {
  return (
    <h1 className='page-header'>{props.header}</h1>
  )
}

export default PageHeader