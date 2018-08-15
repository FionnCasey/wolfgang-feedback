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

const orderByVotesAsc = list => {
	return list.sort((a, b) => a._votes.sumVotes() > b._votes.sumVotes() ? 1 : 0);
};

export {
	sumVotes,
	countVotes
};
