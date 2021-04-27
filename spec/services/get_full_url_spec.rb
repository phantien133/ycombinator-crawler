require "rails_helper"

RSpec.describe 'GetFullUrl' do
  describe '.execute' do
    subject { GetFullUrl.execute(href, url) }

    let(:host) { Faker::Internet.url(path: nil) }
    let(:pathname) { generate_path_name }
    let(:href_path) { "#{generate_path_name}.jpg" }
    let(:url) { host }
    let(:href) { href_path }
    let(:full_url) { "#{host}/#{pathname}" }
    let(:result) { "#{host}/#{href_path}" }

    def generate_path_name
      ([Faker::Internet.slug] * rand(1..5)).join('/')
    end

    context 'with empty href' do
      let(:href) { '' }

      it { is_expected.to be_nil }
    end

    context 'with href is data string' do
      let(:href) { 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABDCAMAAABdlVDoAAAC' }

      it { is_expected.to eq href }
    end

    context 'with href is a full url' do
      let(:href) { Faker::Internet.url(path: true) }

      it { is_expected.to eq href }
    end

    context 'with href is a pathname' do
      let(:url) { host }

      context 'with href that start with "/"' do
        let(:href) { "/#{href_path}" }

        it { is_expected.to eq result }
      end

      context 'with href that don\'t start with "/"' do
        let(:href) { href_path }

        it { is_expected.to eq result }
      end
    end

    context 'with emplty url' do
      let(:url) { '' }

      it { is_expected.to be_nil }
    end

    context 'with url as a full url' do
      let(:url) { full_url }

      it { is_expected.to eq result }
    end

    context 'with url contain only host' do
      let(:url) { host }

      it { is_expected.to eq result }
    end
  end
end
