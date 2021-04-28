class Crawler::CrawMetaPost < Crawler::Base
  SOCIAL_TAG = %w(twitter fb og).freeze
  PERMITTED_SIZE = 200

  def execute(url:, doc: nil)
    doc ||= load_doc(url)
    return {} unless crawlable?(doc)
    meta = pick_meta_data(doc)

    image = meta[:image] || pick_content_image(doc)
    meta[:image] = correct_href(image, url) if image.present?

    content = read_content(doc)
    if content.present? && Nokogiri::HTML(content).content.present?
      meta[:content] = content
    end
    meta
  rescue Crawler::Errors::Uncrawable
    {}
  end

  private

  def pick_meta_data(doc)
    (SOCIAL_TAG + [nil]).each_with_object({}) do |prefix, tag_meta|
      %i(title image description).each do |tag|
        property = [prefix, tag].compact.join(':')
        node = doc.css("meta[name='#{property}'], meta[property='#{property}']").first
        tag_meta[tag.to_sym] = node['content'] if node.present?
      end
    end.tap { |meta| meta[:crawable] = true }
  end

  def pick_content_image(doc)
    image = nil
    max_size = 0
    doc.css('img').each do |img|
      width = img['width'].to_i
      if width >= max_size
        image = img['src']
        max_size = width
      end
      break if width >= PERMITTED_SIZE
    end
    image
  end

  def read_content(doc)
    return '' if doc.blank?
    Readability::Document.new(doc).content
  rescue
    nil
  end
end
