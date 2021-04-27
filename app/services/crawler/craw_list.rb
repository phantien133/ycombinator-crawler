class Crawler::CrawList < Crawler::Base
  include CacheHelper

  BA_YCOM_HOST = ENV['BA_YCOM_HOST']
  BA_YCOM_MORE_CONTENT = ENV['BA_YCOM_MORE_CONTENT']

  def execute(list_path:, page: nil)
    page ||= 1
    with_collection_cache(list_path, page.to_s) do
      end_point = "#{list_path}?#{{ page: page }.to_query}"
      doc = load_doc(BA_YCOM_HOST, end_point)
      {
        data: export_list(doc),
        more: have_more?(doc),
      }
    end
  rescue Crawler::Errors::Uncrawable
    {
      data: [],
      more: false,
    }
  end

  private

  def export_list(doc)
    doc.css('tr.athing').map do |athing|
      post = athing.css('td.title a.storylink').first
      link = post && post['href']
      site = athing.css('span.sitestr').first
      id = athing['id']
      {
        id: id,
        rank: athing.css('td.title span.rank').first.content.to_s[0..-2],
        votelinks: [BA_YCOM_HOST, athing.css('td.votelinks a').first['href']].join('/'),
        title: post && post.content,
        link: link,
        site: site && site.content,
        meta: cache.fetch(id) { Crawler::CrawMetaPost.execute(url: link) },
      }
    end
  end

  def have_more?(doc)
    return false if doc.blank?
    more_link = doc.css('tr td.title a.morelink').first
    more_link.present? && more_link.content == BA_YCOM_MORE_CONTENT
  end
end
