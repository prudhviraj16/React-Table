import {format} from 'date-fns'

export const columns = [
  {
    Header: "Id",
    accessor: "id",
    Footer: "Id",
  },
  {
    Header: "Firstname",
    accessor: "first_name",
    Footer: "Firstname",
  },
  {
    Header: "Lastname",
    accessor: "last_name",
    Footer: "Lastname",
  },
  {
    Header: "Email",
    accessor: "email",
    Footer: "Email",
  },
  {
    Header: "age",
    accessor: "age",
    Footer: "age",
  },
  {
    Header: "Country",
    accessor: "country",
    Footer: "Country",
  },
  {
    Header: "Phone",
    accessor: "phone",
    Footer: "Phone",
  },
  {
    Header: "Date of birth",
    accessor: "dob",
    Footer: "Date of birth",
    Cell : ({value}) => {
      return format(new Date(value), 'dd/MM/yyyy');
    }
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "Name",
    columns: [
      {
        Header: "Firstname",
        Footer: "Firstname",
        accessor: "first_name",
      },
      {
        Header: "Lastname",
        Footer: "Lastname",
        accessor: "last_name",
      },
    ],
  },
  {
    Header: "Info",
    accessor: "Info",
    columns: [
      {
        Header: "Email",
        Footer: "Email",
        accessor: "email",
      },
      {
        Header: "age",
        Footer: "age",
        accessor: "age",
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      },
      {
        Header: "Date of birth",
        Footer: "Date of birth",
        accessor: "dob",
      },
    ],
  },
];
