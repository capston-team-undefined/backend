import { Quiz } from 'src/entities/quiz.entity';
import { SelectQueryBuilder } from 'typeorm';

export function createBaseQuizQueryBuilder(queryBuilder: SelectQueryBuilder<Quiz>) {
    return queryBuilder
      .leftJoinAndSelect('quiz.tag', 'tag')
      .leftJoinAndSelect('quiz.user', 'user')
      .select([
        'quiz.uuid',
        'quiz.title',
        'quiz.type',
        'quiz.createdAt',
        'user.uuid',
        'user.name',
        'tag.tag',
      ]);
}
