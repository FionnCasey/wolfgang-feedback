const sumVotes = votes => votes.reduce((total, vote) => total + vote.value, 0) || 0;

const countVotes = votes => {
	return votes.reduce((total, vote) => {
		if (vote.value > 0) {
			total.up += vote.value;
		} else if (vote.value < 0) {
			total.down += Math.abs(vote.value);
		}
		total.score += vote.value;
		total.numVotes++;
		return total;
	}, { up: 0, down: 0, score: 0, numVotes: 0 });
};

const sortModes = {
	none: (a, b) => 0,
	orderByScoreDescending: (a, b) => sumVotes(a._votes) > sumVotes(b._votes) ? 1 : -1,
	orderByScoreAscending: (a, b) => sumVotes(a._votes) < sumVotes(b._votes) ? 1 : -1
};

const countChildren = root => {
  let total = root.length;
  total += root.reduce((a, n) => a + countChildren(n._children), 0);
  return total;
};

export {
	sumVotes,
	countVotes,
	sortModes,
	countChildren
};
