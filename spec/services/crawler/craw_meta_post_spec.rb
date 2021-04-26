require "rails_helper"

RSpec.describe Crawler::CrawMetaPost do
  include CrawMetaPostTestHelper

  subject { Crawler::CrawMetaPost.execute(url: url) }

  let(:host) { Faker::Internet.url(path: nil) }
  let(:url) { "#{host}/#{([Faker::Internet.slug] * rand(1..5)).join('/')}" }

  context 'when can\'t load target page' do
    context 'with connection error' do
      before { allow(Net::HTTP).to receive(:get).and_raise(SocketError) }

      it { is_expected.to eq({}) }
    end

    context 'with unexpected target reponse' do
      before { allow(Net::HTTP).to receive(:get).and_return('<PDF unknown content.') }

      it { is_expected.to eq({}) }
    end
  end

  context 'when got target page' do
    let(:meta_tags) { [] }
    let(:page_images) { [] }
    let(:html) { factory_target_template(meta_tags, page_images) }
    let(:meta_data) do
      {
        title: Faker::Lorem.sentence,
        content: Faker::Lorem.sentence,
        image: Faker::Internet.url,
      }
    end

    before do
      allow(Net::HTTP).to receive(:get).and_return(html)
      allow_any_instance_of(Readability::Document).
        to receive(:content).and_return(meta_data[:content])
    end

    shared_examples_for 'when have full meta' do |without_image|
      if without_image
        it do
          expect(GetFullUrl).not_to receive(:execute)
          subject
        end
      else
        it do
          expect(GetFullUrl).to receive(:execute).with(meta_data[:image], url).exactly(1)
          subject
        end
      end
      it { is_expected.to eq meta_data.merge(crawable: true) }
    end

    shared_examples_for 'with meta tags' do |have_image|
      context "when have meta tags" do
        context 'with meta from property attr' do
          let(:meta_tags) do
            meta_data.map do |key, value|
              factory_meta({ property: meta_names[key] }, value)
            end
          end

          it_behaves_like 'when have full meta', have_image
        end

        context 'with meta from name attr' do
          let(:meta_tags) do
            meta_data.map do |key, value|
              factory_meta({ name: meta_names[key] }, value)
            end
          end

          it_behaves_like 'when have full meta', have_image
        end
      end
    end

    context 'with page have meta' do
      context "with twitter meta" do
        let(:meta_names) do
          {
            title: 'twitter:title',
            content: 'twitter:content',
            image: 'twitter:image',
          }
        end

        it_behaves_like 'with meta tags'
      end

      context "with fb meta" do
        let(:meta_names) do
          {
            title: 'fb:title',
            content: 'fb:content',
            image: 'fb:image',
          }
        end

        it_behaves_like 'with meta tags'
      end

      context "with og meta" do
        let(:meta_names) do
          {
            title: 'og:title',
            content: 'og:content',
            image: 'og:image',
          }
        end

        it_behaves_like 'with meta tags'
      end

      context "with site meta" do
        let(:meta_names) do
          {
            title: 'title',
            content: 'content',
            image: 'image',
          }
        end

        it_behaves_like 'with meta tags'
      end

      context 'without image meta' do
        let(:meta_data) do
          {
            title: Faker::Lorem.sentence,
            content: Faker::Lorem.sentence,
          }
        end

        context 'with page don\'t have any image' do
          let(:meta_names) do
            {
              title: 'twitter:title',
              content: 'twitter:content',
            }
          end

          it_behaves_like 'with meta tags', true
        end

        shared_examples_for 'pick image in page' do |message|
          it do
            expect(GetFullUrl).to receive(:execute).with(correct_image[:src], url).exactly(1)
            subject
          end

          it "#{message}" do
            expect(subject[:image]).to eq correct_image[:src]
          end
        end

        context 'when meta don\'t contain image' do
          let(:images) { [] }
          let(:page_images) { (images + [correct_image]).shuffle }
          let(:meta_names) do
            {
              title: 'twitter:title',
              content: 'twitter:content',
            }
          end
          let(:permiited_size) { Crawler::CrawMetaPost::PERMITTED_SIZE }
          let(:correct_image) { { src: Faker::Internet.url, width: width } }

          context 'when have only one image' do
            context 'with width equal permiited size' do
              let(:width) { permiited_size }

              it_behaves_like 'pick image in page'
            end

            context 'with width greater than permiited size' do
              let(:width) { permiited_size + 1 }

              it_behaves_like 'pick image in page'
            end

            context 'with width less than permiited size' do
              let(:width) { permiited_size - 1 }

              it_behaves_like 'pick image in page'
            end
          end

          context 'when have only many images' do
            context 'without any images greater than permitted size' do
              let(:page_images) do
                [
                  { src: Faker::Internet.url, width: permiited_size - 2 },
                  { src: Faker::Internet.url, width: permiited_size - 3 },
                  { src: Faker::Internet.url, width: permiited_size - 4 },
                  correct_image,
                ].shuffle
              end
              let(:width) { permiited_size - 1 }

              it_behaves_like 'pick image in page', 'pick the biggest image'
            end

            context 'without many images greater than permitted size' do
              let(:page_images) do
                [
                  { src: Faker::Internet.url, width: permiited_size - 1 },
                  correct_image,
                  { src: Faker::Internet.url, width: permiited_size + 10 },
                  { src: Faker::Internet.url, width: permiited_size * 2 },
                ]
              end
              let(:width) { permiited_size }

              it_behaves_like 'pick image in page',
                              'pick the first image that have width gte permitted size'
            end
          end
        end
      end
    end
  end
end
