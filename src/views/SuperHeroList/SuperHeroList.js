import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import tableColumns, { getExpandedColumns } from './tableColumns';
import charactersService from '../../services/characters/charactersService';
import isEmpty from '../../utils/isEmpty';

const SuperHeroList = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await charactersService.getCharacters();
      const charactersList = response.reduce((acc, promise) => {
        if (promise.status === 'fulfilled') {
          const character = promise.value;
          return [
            ...acc, 
            {
              ...character,
              key: character.id,
              fullName: character.biography['full-name'],
              alignment: character.biography.alignment,
              height: character.appearance.height[0],
              heightInCm: character.appearance.height[1],
              weight: character.appearance.weight[0],
              race: character.appearance.race,
              intelligence: character.powerstats.intelligence,
              power: character.powerstats.power,
              speed: character.powerstats.speed,
              strength: character.powerstats.strength,
              work: character.work.occupation,
            }
          ];
        }
        return acc;
      }, []);
      setCharacters(charactersList);
    };
    fetchData();
  }, []);

  const renderExpandedDescription = (character) => {
    const { Paragraph, Title } = Typography;
    const expandedColumns = getExpandedColumns(character);
    
    return (
      <Typography>
        {expandedColumns.map((col) => (
          <Typography key={col.key}>
            <Title level={5}>{col.title}</Title>
            <Paragraph>{col.value}</Paragraph>
          </Typography>
        ))}
      </Typography>
    )
  }

  return (
    <Table 
      columns={tableColumns} 
      dataSource={characters} 
      expandable={{
        expandedRowRender: renderExpandedDescription,
        rowExpandable: character => character.name !== 'Not Expandable',
      }}
      loading={isEmpty(characters)}
    />
  );
};

export default SuperHeroList;