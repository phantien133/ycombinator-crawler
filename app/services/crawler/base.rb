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

  def correct_href(*args)
    GetFullUrl.execute(*args)
  end
end
