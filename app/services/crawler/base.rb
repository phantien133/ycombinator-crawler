class Crawler::Base < ServiceBase
  private

  def load_doc(*args)
    Nokogiri::HTML(load_raw_html(*args))
  end

  def load_raw_html(*args)
    Net::HTTP.get(URI(args.join('/')))
  rescue StandardError
    ''
  end

  def detectable?(doc)
    doc.html? && doc.content.length > 0
  end

  def correct_href(url, link)
    full_url = URI(url)
    return url if full_url.host.present?
    path = full_url.path
    path = path[1..-1] if path[0] == '/'
    [URI.join(link, '/').to_s, path].join
  end
end
