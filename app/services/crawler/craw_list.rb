class Crawler::CrawList < Crawler::Base
  BA_YCOM_HOST = ENV['BA_YCOM_HOST']
  BA_YCOM_MORE_CONTENT = ENV['BA_YCOM_MORE_CONTENT']

  def execute(list_path:, page: nil)
    page ||= 1
    doc = load_doc(BA_YCOM_HOST, "#{list_path}?#{{ page: page }.to_query}")
    {
      data: export_list(doc),
      more: have_more?(doc),
    }
  end

  private

  def export_list(doc)
    doc.css('tr.athing').map do |athing|
      post = athing.css('td.title a.storylink').first
      link = post && post['href']
      site = athing.css('span.sitestr').first
      {
        id: athing['id'],
        rank: athing.css('td.title span.rank').first.content.to_s[0..-2],
        votelinks: [BA_YCOM_HOST, athing.css('td.votelinks a').first['href']].join('/'),
        title: post && post.content,
        link: link,
        site: site && site.content,
        meta: Crawler::CrawMetaPost.execute(link),
      }
    end
  end

  def have_more?(doc)
    return false if doc.blank?
    more_link = doc.css('tr td.title a.morelink').first
    more_link.present? && more_link.content == BA_YCOM_MORE_CONTENT
  end
end
