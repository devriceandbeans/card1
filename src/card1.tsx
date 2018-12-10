import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ApplicationState } from './store'
import { Card } from './store/card/types'
import { fetchRequest } from './store/card/actions'

import './card1.scss'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Card[]
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch

class CardComponent extends React.Component<AllProps> {

  public componentDidMount() {
    this.props.fetchRequest()
  }

  public render() {

    const { loading} = this.props

    return (
      <div>
        {loading && <div>Loading...</div>}
        {this.renderData()}
      </div>
    )
  }

  private renderData() {
    const { loading, data } = this.props

    return (
      <div>
        {loading && data.length === 0 && (
          <div>Loading...</div>
        )}
        {
          data.map(card => (
            <div className={`card w-50`} key={`${card.id}`}>
              <div className={`row`}>
                <div className={`col-4`}>
                  <img className={`card-img-top h-100`} src={`${card.image}`} alt={`${card.title}`} />
                </div>
                <div className={`col-8`}>
                  <div className={`card-body`}>
                    <h5 className={`card-title`}>{card.title}</h5>
                    <p className={`card-text`}>{card.description}</p>
                    <p className={`card-text`}><small className={`text-muted`}>Last updated 3 mins ago</small></p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}
// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ cards }: ApplicationState) => ({
  loading: cards.loading,
  errors: cards.errors,
  data: cards.data
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest())
})

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps, mapDispatchToProps)(CardComponent)
