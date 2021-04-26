module CrawMetaPostTestHelper
  def factory_meta(attrs, content)
    attrs.merge(
      content: content,
    )
  end

  def render_meta(attrs)
    <<-META
      <meta #{attrs.except(:content).map { |key, value| "#{key}=\"#{value}\"" }.join(' ')} content="#{attrs[:content]}">
    META
  end

  def render_image(image)
    <<-IMAGE
      <img width=#{image[:width]} src="#{image[:src]}">
      IMAGE
  end

  def factory_target_template(meta_tags, images)
    <<-HTML_TEMPLATE
    <html lang="en" op="best">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        #{meta_tags.map { |attrs| render_meta(attrs) }.join("\n")}
      </head>
      <body>
        #{images.map { |image| render_image(image) }.join("\n")}
      </body>
    </html>
    HTML_TEMPLATE
  end
end
