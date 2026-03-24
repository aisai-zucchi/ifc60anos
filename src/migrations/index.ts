import * as migration_20260324_170925_add_ranking_field from './20260324_170925_add_ranking_field';

export const migrations = [
  {
    up: migration_20260324_170925_add_ranking_field.up,
    down: migration_20260324_170925_add_ranking_field.down,
    name: '20260324_170925_add_ranking_field'
  },
];
