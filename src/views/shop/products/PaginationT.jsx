import React from 'react'
import PropTypes from 'prop-types'
import Pagination from '@mui/material/Pagination'
import CardContent from '@mui/material/CardContent'

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number
}

const defaultProps = {
  initialPage: 1,
  pageSize: 3
}

class PaginationT extends React.Component {
  constructor(props) {
    super(props)
    this.state = { pager: {}, page: 0 }
  }

  UNSAFE_componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage)
    }
  }

  componentDidUpdate(prevProps) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage)
    }
  }

  handleChangePage = (e, page) => {
    this.setPage(page)
  }

  setPage(page) {
    var { items, pageSize } = this.props
    var pager = this.state.pager

    if (page < 1 || page > pager.totalPages) {
      return
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page, pageSize)

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1)

    // update state
    this.setState({ pager: pager })

    // call change page function in parent component
    this.props.onChangePage(pageOfItems)
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1

    // default page size is 10
    pageSize = pageSize || 9

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize)

    var startPage, endPage
    if (totalPages <= 9) {
      // less than 10 total pages so show all
      startPage = 1
      endPage = totalPages
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 5) {
        startPage = 1
        endPage = 9
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 8
        endPage = totalPages
      } else {
        startPage = currentPage - 4
        endPage = currentPage + 4
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i)

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    }
  }

  render() {
    var pager = this.state.pager

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null
    }

    return (
      <div>
        <CardContent sx={{ p: theme => `${theme.spacing(3, 5.25, 4)}` }}>
          <Pagination
            count={pager.totalPages}
            page={this.state.page}
            onChange={this.handleChangePage}
            size='medium'
            shape='rounded'
          />
        </CardContent>
      </div>
    )
  }
}

PaginationT.propTypes = propTypes
PaginationT.defaultProps = defaultProps
export default PaginationT
