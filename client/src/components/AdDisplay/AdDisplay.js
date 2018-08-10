//standard dependencies
import React from 'react'
//semantic components
import { Segment} from 'semantic-ui-react'

const AdDisplay = props => (
<div>
<Segment class="ui raised segment">
<p>Host Ad!</p>
<button class="ui icon button">
  <i class="download icon"></i>
</button>
</Segment>
</div>

)

export default AdDisplay;