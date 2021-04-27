module CrawListTestHelper
  def response_result(data: [], more: false)
    {
      data: data,
      more: more,
    }
  end

  def factory_post
    {
      id: Faker::Number.number(digits: 10).to_s,
      rank: rand(1..30).to_s,
      votelinks: 'path_to_vote',
      title: Faker::Lorem.sentence,
      link: Faker::Internet.url,
      site: Faker::Internet.url,
      meta: {},
    }
  end

  def factory_render_post(post)
    sitestr =
      if post[:site]
        <<-SITESTR
          (<a href="from?site=#{post[:site]}"><span class="sitestr">#{post[:site]}</span></a>)
        SITESTR
      else
        ''
      end
    <<-POST
      <tr class='athing' id='#{post[:id]}'>
          <td align="right" valign="top" class="title"><span class="rank">#{post[:rank]}.</span></td>
          <td valign="top" class="votelinks">
            <center>
                <a id='up_26887670' href='#{post[:votelinks]}'>
                  <div class='votearrow' title='upvote'></div>
                </a>
            </center>
          </td>
          <td class="title"><a href="#{post[:link]}" class="storylink">#{post[:title]}</a><span class="sitebit comhead">#{sitestr}</span></td>
      </tr>
    POST
  end

  def render_more
    <<-MORE
      <tr>
          <td colspan="2"></td>
          <td class="title"><a href="" class="morelink" rel="next">More</a></td>
      </tr>
    MORE
  end

  def factory_target_template(posts:, more: false)
    <<-HTML_TEMPLATE
    <html lang="en" op="best">
      <head>
      </head>
      <body>
          <center>
            <table id="hnmain" border="0" cellpadding="0" cellspacing="0" width="85%" bgcolor="#f6f6ef">
                <tr>
                  <td bgcolor="#ff6600">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding:2px">
                        <tr>
                            <td style="width:18px;padding-right:4px"><a href="https://news.ycombinator.com"><img src="y18.gif" width="18" height="18" style="border:1px white solid;"></a></td>
                        </tr>
                      </table>
                  </td>
                </tr>
                <tr id="pagespace" title="Top Links" style="height:10px"></tr>
                <tr>
                  <td>
                      <table border="0" cellpadding="0" cellspacing="0" class="itemlist">
                        #{posts.map { |post| factory_render_post(post) }.join("\n\t")}
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class="morespace" style="height:10px"></tr>
                        #{more ? render_more : ''}
                      </table>
                  </td>
                </tr>
                <tr>
                  <td>
                      <img src="s.gif" height="10" width="0">
                      <table width="100%" cellspacing="0" cellpadding="1">
                        <tr>
                            <td bgcolor="#ff6600"></td>
                        </tr>
                      </table>
                      <br>
                      <center>
                        <span class="yclinks"><a href="newsguidelines.html">Guidelines</a>
                        | <a href="newsfaq.html">FAQ</a>
                        | <a href="lists">Lists</a>
                        | <a href="https://github.com/HackerNews/API">API</a>
                        | <a href="security.html">Security</a>
                        | <a href="http://www.ycombinator.com/legal/">Legal</a>
                        | <a href="http://www.ycombinator.com/apply/">Apply to YC</a>
                        | <a href="mailto:hn@ycombinator.com">Contact</a></span><br><br>
                        <form method="get" action="//hn.algolia.com/">Search:
                            <input type="text" name="q" value="" size="17" autocorrect="off" spellcheck="false" autocapitalize="off" autocomplete="false">
                        </form>
                      </center>
                  </td>
                </tr>
            </table>
          </center>
      </body>
    </html>
    HTML_TEMPLATE
  end
end
