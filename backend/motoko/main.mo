import Array "mo:base/Array";

persistent actor {
  var jobs : [Text] = [];
  var challenges : [Text] = [];

  public func addJob(j : Text) : async () {
    jobs := Array.append(jobs, [j]);
  };

  public query func getJobs() : async [Text] {
    return jobs;
  };

  public func addChallenge(c : Text) : async () {
    challenges := Array.append(challenges, [c]);
  };

  public query func getChallenges() : async [Text] {
    return challenges;
  };

  public query func ping() : async Text {
    "ICP backend alive";
  };
};
