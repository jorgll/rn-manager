import React from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { employeesFetch } from '../actions';
import { AppState } from '../../App';
import EmployeeListItem from './EmployeeListItem';
import _ from 'lodash';

export interface EmployeeListrops {
    employeesFetch: () => void;
    employees: any;
}

interface EmployeeListState {
}

const mapStateToProps = (state: AppState) => {
    if (!state.employees) return {};
    
    return {
        employees: _.map(state.employees, (val, uid) => {
            return { ...val, uid };
        })
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ employeesFetch }, dispatch);

class EmployeeList extends React.Component<EmployeeListrops, EmployeeListState> {
    dataSource: any;

    constructor(props: EmployeeList) {
        super(props);
    }

    componentWillMount() {
        this.props.employeesFetch();
        this.createDataSource(this.props.employees);
    }

    componentWillReceiveProps(nextProps: any) {
        this.createDataSource(nextProps.employees);
    }

    createDataSource (employees: any) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.dataSource = ds.cloneWithRows(employees);
    }

    renderRow(employee: any) {
        return <EmployeeListItem employee={employee} />; 
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource = {this.dataSource}
                renderRow = {this.renderRow}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);