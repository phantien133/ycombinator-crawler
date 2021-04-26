class Crawler::Base < ServiceBase
  private

  def load_doc(*args)
    Nokogiri::HTML(load_raw_html(*args))
  end

  def load_raw_html(*args)
    return '' if args.blank?
    Net::HTTP.get(URI(args.join('/')))
  rescue SocketError => e
    raise Crawler::Errors::Uncrawable, e.message
  rescue
    ''
  end

  def crawlable?(doc)
    doc.html? && doc.content.length > 0
  end

  def correct_href(*args)
    GetFullUrl.execute(*args)
  end

  def generate_id(og_id, link)
    { og_id: og_id, link: link }.to_query
  end
end
