import { Image, Tag } from 'antd';

const toNumber = (value) => {
  return parseFloat(value.split(" ")?.[0]);
};
  
const sorter = (a, b, attr, attrType) => {
  console.log('attr here', attr, a, b);
  switch (attrType) {
    case 'withUnit':
      return toNumber(a.heightInCm) - toNumber(b.heightInCm);
    case 'string':
      if (a[attr] < b[attr]) return -1;
      if ( a[attr] > b[attr]) return 1;
      return 0;
    default:
      return a[attr] - b[attr];
  };
};
  
const tableColumns = [
  {
    title: '',
    dataIndex: 'image',
    render: (image) => {
      return <Image src={image.url} width={40} alt="superhero" />
    },
  },
  {
    title: 'SuperHero',
    dataIndex: 'name',
    sorter: (a, b) => sorter(a, b, 'name', 'string'),
  },
  {
    title: 'Alignment',
    dataIndex: 'alignment',
    render: (alignment) => {
      return (
        <Tag color={alignment === 'good' ? 'green' : 'volcano'}>
          {alignment === 'good' ? 'HERO' : 'VILLIAN'}
        </Tag>
      )
    },
    sorter: (a, b) => sorter(a, b, 'alignment', 'string'),
  },
  {
    title: 'Full Name',
    dataIndex: 'fullName',
  },
  {
    title: 'Height',
    dataIndex: 'height',
    sorter: (a, b) => sorter(a, b, 'height', 'withUnit'),
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    sorter: (a, b) => sorter(a, b, 'weight', 'withUnit'),
  },
  {
    title: 'Race',
    dataIndex: 'race',
  },
  {
    title: 'Intelligence',
    dataIndex: 'intelligence',
    sorter: (a, b) => sorter(a, b, 'intelligence'),
  },
  {
    title: 'Power',
    dataIndex: 'power',
    sorter: (a, b) => sorter(a, b, 'power'),
  },
  {
    title: 'Speed',
    dataIndex: 'speed',
    sorter: (a, b) => sorter(a, b, 'speed'),
  },
  {
    title: 'Strength',
    dataIndex: 'strength',
    sorter: (a, b) => sorter(a, b, 'strength'),
  },
  {
    title: 'Work',
    dataIndex: 'work',
    ellipsis: true,
  },
];

export const getExpandedColumns = (character) => ([
  {
    key: 'birthPlace',
    title: 'Birth Place',
    value: character.biography['place-of-birth'],
  },
  {
    key: 'firstAppearance',
    title: 'First Appearance',
    value: character.biography['first-appearance'],
  },
  {
    key: 'publisher',
    title: 'Publisher',
    value: character.biography.publisher,
  },
  {
    key: 'groupAffiliations',
    title: 'Group Affiliations',
    value: character.connections['group-affiliation'],
  },
  {
    key: 'relatives',
    title: 'Relatives',
    value: character.connections.relatives,
  }
]);

export default tableColumns;