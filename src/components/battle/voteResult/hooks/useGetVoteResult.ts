import { useQuery } from '@tanstack/react-query';

import { createBattleVote } from '../../api';
import { Vote } from '../../types';

interface Props {
  battleId: number;
  votedPostId: number;
}

export const useGetVoteResult = ({ battleId, votedPostId }: Props) => {
  return useQuery<Vote>(['voteResult', battleId, votedPostId], () => createBattleVote(battleId, votedPostId), {
    enabled: !!battleId && !!votedPostId,
  });
};
