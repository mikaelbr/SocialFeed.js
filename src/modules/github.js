var SocialBase = require('../basemodule')
  , resources = require('../resources')
  , _ = require('../utils')
  , tmpl = {
    create: resources.github_create,
    createbranch: resources.github_createbranch,
    watch: resources.github_watch,
    push: resources.github_push,
    pullrequest: resources.github_pullrequest,
    fork: resources.github_fork,
    issue: resources.github_issue
  };

var templateHelper = function (template, item) {
  return tmpl[template]
            .replace('{{profileUrl}}', item.actor.url)
            .replace('{{username}}', item.actor.login)
            .replace('{{reponame}}', item.repo.name)
            .replace('{{repourl}}', 'https://github.com/' + item.repo.name)
            .replace('{{time_since}}', _.timesince(item.created_at))
            .replace('{{created_at}}', item.created_at);
};

module.exports = SocialBase.extend({
  url: function () {
    return 'https://api.github.com/users/' + this.ident + '/events';
  }

  , orderBy: function (item) {
    return -(new Date(item.created_at)).getTime();
  }

  , renderMethods: {
    'CreateEvent': function (item) {

      if (item.payload.ref === null) {
        return templateHelper('create', item);
      }

      return templateHelper('createbranch', item)
                .replace('{{branchurl}}', item.repo.url + '/tree/' + item.payload.ref)
                .replace('{{branchname}}', item.payload.ref);
    }

    , 'WatchEvent': function (item) {
      return templateHelper('watch', item);
    }

    , 'PushEvent': function (item) {
      var $html = $(templateHelper('push', item));

      // Add commits: 
      var $ul = $html.find('.socialfeed-commit-list')
        , $li = $ul.find('li:first');

      _.each(item.payload.commits, function(commit) {
        var $it = $li.clone();

        $it.find('a').attr('href', commit.url).text(commit.sha.substr(0, 7));
        $it.find('span').text(commit.message);
        $ul.append($it);
      });
      $li.remove();
      return $html;
    }

    , 'PullRequestEvent': function (item) {
      return templateHelper('pullrequest', item)
                .replace('{{action}}', item.payload.action)
                .replace('{{title}}', item.payload.pull_request.title)
                .replace('{{pullrequesturl}}', item.payload.pull_request.html_url)
                .replace('{{pullrequestname}}', item.repo.name + '#' + item.payload.number);
    }

    , 'ForkEvent': function (item) {
      return templateHelper('fork', item)
                .replace('{{forkeeurl}}', item.payload.forkee.html_url)
                .replace('{{forkeename}}', item.payload.forkee.full_name);
    }

    , 'IssuesEvent': function (item) {
      return templateHelper('issue', item)
                .replace('{{action}}', item.payload.action)
                .replace('{{title}}', item.payload.issue.title)
                .replace('{{issueurl}}', item.payload.issue.html_url)
                .replace('{{issuename}}', item.repo.name + '#' + item.payload.number);
    }
  }

  , parse: function (resp) {
    return resp.data;
  }

  , render: function (item) {
    if (item.type && this.renderMethods[item.type]) {
      return this.renderMethods[item.type].apply(this, [item]);
    }
  }

});