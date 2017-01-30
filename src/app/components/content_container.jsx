import React from 'react';
import {currentPageTitle} from '../reducers/pages';
import * as actions from '../actions';
import {connect} from 'react-redux';
import Layout from '@nowtv/nowtv-web-toolkit/src/react/components/Layout/Layout.react';

const mapStateToProps = (state) => {
	return ({
		currentPageTitle: currentPageTitle(state)
	});
};

class ContentContainer extends React.Component {
	render() {
		const {currentPageTitle} = this.props;
		return (
		<div>
			<Layout display="rows" colour="blue" >
				<Layout.Header icon='<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><path d="M197.775 255.814c1.935 0 3.508-1.574 3.508-3.51V24.46c0-1.14-.64-2.225-1.706-2.902l-.233-.175-22.66-20.3c-1.332-1.194-3.346-1.2-4.683 0l-20.828 18.664-20.836-18.663c-1.327-1.195-3.34-1.2-4.68-.002l-20.827 18.665L83.992 1.084c-.666-.598-1.5-.897-2.34-.897-.836 0-1.67.297-2.338.895L56.62 21.34c-1.17.606-1.9 1.8-1.9 3.12v227.844c0 1.936 1.578 3.51 3.513 3.51h139.542zM61.742 26.254l19.912-17.84 20.836 18.66c1.334 1.198 3.345 1.2 4.678.003l20.826-18.664 20.84 18.662c1.333 1.2 3.343 1.202 4.677.002l20.834-18.664 19.92 17.845v222.536H61.74V26.254z"></path><path d="M156.8 166.694H96.637c-1.936 0-3.512 1.574-3.512 3.51 0 1.935 1.576 3.51 3.512 3.51H156.8c1.936 0 3.513-1.575 3.513-3.51 0-1.936-1.577-3.51-3.512-3.51zM156.8 205.75H96.637c-1.936 0-3.512 1.576-3.512 3.51 0 1.937 1.576 3.51 3.512 3.51H156.8c1.936 0 3.513-1.573 3.513-3.51 0-1.934-1.577-3.51-3.512-3.51zM109.025 134.198h39.22c.92 0 2.106-.142 2.53-.822.507-.814.766-1.923.766-3.296 0-1.343-.24-2.374-.72-3.064-.332-.48-1.245-.743-2.575-.743H118.85l3.42-3.055c3.556-3.18 5.283-6.76 5.283-10.943 0-1.09-.096-2.205-.287-3.312-.19-1.138-.438-2.147-.742-3.004l-.832-2.338h13.802c.773 0 2.062 0 2.062-3.29 0-1.176-.226-2.065-.67-2.642-.356-.458-.776-.656-1.392-.656H123.75l-.468-1.023c-.79-1.727-1.488-3.48-2.07-5.207-.642-1.87-.967-4-.967-6.328 0-3.384 1.04-6.05 3.088-7.926 2.01-1.845 4.644-2.778 7.827-2.778 4.37 0 7.9 1.917 10.5 5.697.683.975 1.49 1.772 2.464 2.423 1.645 1.09 4.46 1.15 5.906-.013.615-.494.892-1.125.892-2.038 0-.68-.088-1.283-.263-1.796-.192-.537-.565-1.244-1.112-2.093-1.816-2.887-4.415-5.226-7.73-6.965-3.322-1.743-7.118-2.625-11.277-2.625-3.025 0-5.867.436-8.452 1.296-2.575.86-4.79 2.056-6.59 3.55-1.785 1.47-3.207 3.28-4.233 5.383-1.01 2.094-1.522 4.404-1.522 6.858 0 1.632.26 3.46.77 5.433.523 2.03 1.183 3.943 1.963 5.687l1.097 2.464h-9.08c-.85 0-1.206.333-1.418.624-.424.58-.64 1.482-.64 2.674 0 3.29 1.29 3.29 2.06 3.29h11.318l.417 1.16c.376 1.05.68 2.244.903 3.543.222 1.28.335 2.818.335 4.57 0 2.005-.345 3.802-1.026 5.34-.667 1.478-1.49 2.77-2.452 3.85-.954 1.068-2.034 2.01-3.214 2.81-1.094.737-2.16 1.42-3.22 2.054-1.35.814-1.87 1.444-2.067 1.828-.326.61-.48 1.266-.48 2.02 0 .972.28 1.797.855 2.523.455.564 1.577.878 3.16.878z"></path></g></svg>' isMobile={undefined} heading={currentPageTitle}/>
				<Layout.Content>
					{this.props.children}
				</Layout.Content>
			</Layout>
		</div>
		);
	}
}

export default connect(mapStateToProps, actions)(ContentContainer);
