import React from 'react'
import { connect } from 'react-redux'

//Components
import Block from '../components/block/block'


//Actions
import { fetchBlock } from '../store/actions/blocks'


const BlockContainer = ({blocks, userShow, blockShow}) => {
  // debugger
  return (
  <div id="feed" className="row">
    {blocks.map(block => <Block key={block.id} block={block} blockShow={blockShow}/>
    )}
  </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    blockShow: (block) => {
    return dispatch(fetchBlock(block))
    }
  }
}

export default connect(null, mapDispatchToProps)(BlockContainer)
