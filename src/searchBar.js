import React from 'react';

//Universal
//Works with both onSubmit [SEARCH]
//And onChange [SEARCH]
class SearchBar extends React.Component {

    state = {
        searchTerm: this.props.searchTerm || ''
    }

    //'search' triggered onSubmit
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ searchTerm: this.el.value }, () => {
            if (this.props.handleSubmit)
                this.props.handleSubmit(this.state.searchTerm);
        });
    }

    //'search' triggered on change
    handleOnChange = (event) => {
        event.preventDefault();
        if (this.props.handleOnChange)
            this.props.handleOnChange(this.el.value);
    }

    render() {
        return (
            <div>
                <div className={this.props.styleClassName}>
                    <h1>{this.props.searchHeading}</h1>
                    <form type="get" action="search" onSubmit={(event) => this.handleSubmit(event)}>
                        <input
                            type="search"
                            placeholder={this.props.placeholder}
                            onChange={(event) => this.handleOnChange(event)}
                            ref={el => this.el = el}
                        />
                    </form>

                </div>
                <hr />
            </div>

        );
    }
}
export default SearchBar;